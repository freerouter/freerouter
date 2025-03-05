import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import { CheckIcon, CopyIcon, KeyIcon, PlusIcon, PencilIcon, TrashIcon, EllipsisIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'API Keys',
        href: '/api-keys',
    },
];

export default function ApiKeysIndex({ apiKeys }) {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [newApiKey, setNewApiKey] = useState('');
    const [copied, setCopied] = useState(false);
    const [currentKey, setCurrentKey] = useState(null);
    const nameInput = useRef(null);
    const editNameInput = useRef(null);

    // Create form
    const { data, setData, processing: createProcessing, reset, errors, clearErrors } = useForm({
        name: '',
    });

    // Edit form
    const { data: editData, setData: setEditData, processing: editProcessing, reset: resetEdit, errors: editErrors, clearErrors: clearEditErrors } = useForm({
        name: '',
    });

    // Delete form
    const { processing: deleteProcessing } = useForm();

    const createApiKey = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(route('api-keys.store'), data);
            setNewApiKey(response.data.token);
            reset();
            // Don't reload until user clicks "Done"
        } catch (error) {
            if (error.response?.data?.errors?.name) {
                errors.name = error.response.data.errors.name[0];
                nameInput.current?.focus();
            }
        }
    };

    const updateApiKey = async (e) => {
        e.preventDefault();

        try {
            await axios.put(route('api-keys.update', currentKey.id), editData);
            resetEdit();
            setEditOpen(false);
            // Reload page to get updated API keys list
            window.location.reload();
        } catch (error) {
            if (error.response?.data?.errors?.name) {
                editErrors.name = error.response.data.errors.name[0];
                editNameInput.current?.focus();
            }
        }
    };

    const deleteApiKey = async () => {
        try {
            await axios.delete(route('api-keys.destroy', currentKey.id));
            setDeleteOpen(false);
            // Reload page to get updated API keys list
            window.location.reload();
        } catch (error) {
            console.error('Error deleting API key:', error);
        }
    };

    const openEditModal = (key) => {
        setCurrentKey(key);
        setEditData('name', key.name);
        setEditOpen(true);
    };

    const openDeleteModal = (key) => {
        setCurrentKey(key);
        setDeleteOpen(true);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(newApiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const closeModal = () => {
        clearErrors();
        reset();
        setNewApiKey('');
        setCopied(false);
        setOpen(false);
    };

    const closeEditModal = () => {
        clearEditErrors();
        resetEdit();
        setEditOpen(false);
    };

    const rightActions = (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Create new API key
                </Button>
            </DialogTrigger>
            <DialogContent>
                {!newApiKey ? (
                    <>
                        <DialogTitle>Create API Key</DialogTitle>
                        <DialogDescription>
                            Create a new API key to authenticate with our API. Please copy your API key as it will only be shown once.
                        </DialogDescription>
                        <form className="space-y-6" onSubmit={createApiKey}>
                            <div className="grid gap-2">
                                <Label htmlFor="name">API Key Name</Label>

                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    ref={nameInput}
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="My API Key"
                                />

                                <InputError message={errors.name} />
                            </div>

                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary" onClick={closeModal}>
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button disabled={createProcessing} type="submit">
                                    Create
                                </Button>
                            </DialogFooter>
                        </form>
                    </>
                ) : (
                    <>
                        <DialogTitle>Your API Key</DialogTitle>
                        <DialogDescription>Please copy your API key now. You won't be able to see it again!</DialogDescription>

                        <div className="mt-4 space-y-4">
                            <div className="relative">
                                <div className="flex items-center">
                                    <KeyIcon className="mr-2 h-5 w-5 text-gray-500" />
                                    <Input value={newApiKey} readOnly className="pr-10 font-mono text-sm" />
                                    <Button variant="ghost" size="icon" className="absolute right-0" onClick={copyToClipboard}>
                                        {copied ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
                                    </Button>
                                </div>
                            </div>

                            <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
                                <p>Please copy this API key now. You won't be able to see it again!</p>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button onClick={() => {
                                closeModal();
                                window.location.reload();
                            }}>Done</Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );

    // Edit API Key Dialog
    const EditApiKeyDialog = () => (
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit API Key</DialogTitle>
                    <DialogDescription>
                        Update the name of your API key.
                    </DialogDescription>
                </DialogHeader>
                <form className="space-y-6" onSubmit={updateApiKey}>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-name">API Key Name</Label>
                        <Input
                            id="edit-name"
                            type="text"
                            name="name"
                            ref={editNameInput}
                            value={editData.name}
                            onChange={(e) => setEditData('name', e.target.value)}
                        />
                        <InputError message={editErrors.name} />
                    </div>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={closeEditModal}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={editProcessing} type="submit">
                            Update
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );

    // Delete API Key Dialog
    const DeleteApiKeyDialog = () => (
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete API Key</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this API key? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button variant="destructive" disabled={deleteProcessing} onClick={deleteApiKey}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs} rightActions={rightActions}>
            <Head title="API Keys" />

            <div className="space-y-6 p-4">
                {apiKeys && apiKeys.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th scope="col" className="px-6 py-2 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-2 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                    Created
                                </th>
                                <th scope="col" className="px-6 py-2 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                    Last Used
                                </th>
                                <th scope="col" className="relative px-6 py-2">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {apiKeys.map((key) => (
                                <tr key={key.id}>
                                    <td className="px-6 py-3 text-sm font-medium whitespace-nowrap text-gray-900">{key.name}</td>
                                    <td className="px-6 py-3 text-sm whitespace-nowrap text-gray-500">
                                        {new Date(key.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-3 text-sm whitespace-nowrap text-gray-500">
                                        {key.last_used_at ? new Date(key.last_used_at).toLocaleDateString() : 'Never'}
                                    </td>
                                    <td className="px-6 py-3 text-right text-sm font-medium whitespace-nowrap">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <EllipsisIcon className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => openEditModal(key)}>
                                                    <PencilIcon className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem 
                                                    className="text-red-600"
                                                    onClick={() => openDeleteModal(key)}
                                                >
                                                    <TrashIcon className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="py-12 text-center">
                        <KeyIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No API keys</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new API key.</p>
                    </div>
                )}
            </div>

            {/* Dialogs */}
            <EditApiKeyDialog />
            <DeleteApiKeyDialog />
        </AppLayout>
    );
}