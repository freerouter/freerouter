<?php

namespace App\Http\Controllers;

use App\Models\Provider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProviderController extends Controller
{
    /**
     * Display a listing of providers.
     */
    public function index()
    {
        $providers = Provider::where('is_active', true)->get();

        // Get user-specific provider configurations directly through the relationship
        $userProviders = usr()->providers()->get()->keyBy('id');

        // Merge provider data with user configurations
        $providersWithConfig = $providers->map(function ($provider) use ($userProviders) {
            $userProvider = $userProviders->get($provider->id);

            return [
                'id' => $provider->id,
                'name' => $provider->name,
                'display_name' => $provider->display_name,
                'slug' => $provider->slug,
                'group' => $provider->group,
                'icon' => $provider->icon,
                'status_page_url' => $provider->status_page_url,
                'has_chat_completions' => $provider->has_chat_completions,
                'has_completions' => $provider->has_completions,
                'configured' => $userProvider ? true : false,
                'is_enabled' => $userProvider ? $userProvider->pivot->is_enabled : false,
                'api_key' => $userProvider ? $userProvider->pivot->api_key : null,
                'default_model' => $userProvider ? $userProvider->pivot->default_model : null,
                'config' => $userProvider ? $userProvider->pivot->config : null,
            ];
        });

        return Inertia::render('providers/index', [
            'providers' => $providersWithConfig,
        ]);
    }

    /**
     * Save user-specific provider configuration.
     */
    public function configure(Request $request, Provider $provider)
    {
        $validated = $request->validate([
            'api_key' => 'required|string',
            'is_enabled' => 'required|boolean',
        ]);

        // Using the pivot relationship to store configuration
        usr()->providers()->syncWithoutDetaching([
            $provider->id => [
                'api_key' => $validated['api_key'],
                'is_enabled' => $validated['is_enabled'],
            ]
        ]);

        return back()->with('success', 'Provider configured successfully.');
    }
}
