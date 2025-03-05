<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Models\User;
use Laravel\Sanctum\NewAccessToken;
use Illuminate\Validation\ValidationException;

class ApiKeyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('api-keys/index', [
            'apiKeys' => usr()->tokens()->latest()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $token = usr()->createToken($validated['name']);

        return response()->json([
            'token' => $token->plainTextToken,
            'apiKey' => $token->accessToken
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $token = usr()->tokens()->findOrFail($id);
        $token->name = $validated['name'];
        $token->save();

        return response()->json([
            'message' => 'API key updated successfully',
            'apiKey' => $token
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $token = usr()->tokens()->findOrFail($id);
        $token->delete();

        return response()->json([
            'message' => 'API key deleted successfully'
        ]);
    }
}