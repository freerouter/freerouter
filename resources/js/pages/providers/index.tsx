import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, Provider } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ServerIcon, SettingsIcon } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Providers',
        href: '/providers',
    },
];

export default function ProvidersIndex({ providers } : { providers: Provider[] }) {
    const [configureOpen, setConfigureOpen] = useState<boolean>(false);
    const [currentProvider, setCurrentProvider] = useState<Provider | null>(null);
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        api_key: '',
        is_enabled: true,
        config: {},
    });

    const configureProvider = (e) => {
        e.preventDefault();

        post(route('providers.configure', currentProvider.id), {
            onSuccess: () => {
                closeConfigureModal();
                window.location.reload();
            }
        });
    };

    const openConfigureModal = (provider) => {
        setCurrentProvider(provider);
        setData({
            api_key: provider.api_key || '',
            is_enabled: provider.is_enabled,
            config: provider.config || {},
        });
        setConfigureOpen(true);
    };

    const closeConfigureModal = () => {
        clearErrors();
        reset();
        setConfigureOpen(false);
    };

    const rightActions = null;

    return (
        <AppLayout breadcrumbs={breadcrumbs} rightActions={rightActions}>
            <Head title="AI Providers" />

            <div className="space-y-6 p-4">
                {providers && providers.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                        <tr>
                            <th scope="col" className="px-6 py-2 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                Name
                            </th>
                            <th scope="col" className="relative px-6 py-2">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                        {providers.map((provider) => (
                            <tr key={provider.id}>
                                <td className="px-6 py-3 text-sm font-medium whitespace-nowrap text-gray-900">
                                    <div className="flex items-center space-x-3">
                                        {provider.icon?.url ? (
                                            <img src={provider.icon.url} alt={provider.name} className="h-5 w-5" />
                                        ) : (
                                            <ServerIcon className="h-5 w-5 text-gray-400" />
                                        )}
                                        <span>{provider.display_name || provider.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-3 text-right text-sm font-medium whitespace-nowrap">
                                    <Button variant="outline" size="sm" onClick={() => openConfigureModal(provider)}>
                                        <SettingsIcon className="mr-2 h-4 w-4" />
                                        Configure
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="py-12 text-center">
                        <ServerIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No providers available</h3>
                        <p className="mt-1 text-sm text-gray-500">Contact your administrator to add providers.</p>
                    </div>
                )}
            </div>

            <Dialog open={configureOpen} onOpenChange={setConfigureOpen}>
                <DialogContent>
                    {currentProvider && (
                        <>
                            <DialogHeader>
                                <DialogTitle>Configure {currentProvider.display_name || currentProvider.name}</DialogTitle>
                                <DialogDescription>Configure your API key and settings for this provider.</DialogDescription>
                            </DialogHeader>
                            <form className="space-y-6" onSubmit={configureProvider}>
                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="api_key">API Key</Label>
                                        <Input
                                            id="api_key"
                                            type="password"
                                            name="api_key"
                                            value={data.api_key || ''}
                                            onChange={(e) => setData('api_key', e.target.value)}
                                            placeholder="sk-..."
                                        />
                                        <InputError message={errors.api_key} />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="is_enabled">Enabled</Label>
                                        <Switch id="is_enabled" checked={data.is_enabled} onCheckedChange={(checked) => setData('is_enabled', checked)} />
                                    </div>
                                </div>

                                <DialogFooter className="gap-2">
                                    <DialogClose asChild>
                                        <Button variant="secondary" onClick={closeConfigureModal}>
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button disabled={processing} type="submit">
                                        Save
                                    </Button>
                                </DialogFooter>
                            </form>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
