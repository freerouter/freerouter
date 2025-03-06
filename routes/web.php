<?php

use App\Http\Controllers\ApiKeyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('api-keys', ApiKeyController::class);
    Route::resource('providers', \App\Http\Controllers\ProviderController::class);
    Route::post('providers/{provider}/configure', [\App\Http\Controllers\ProviderController::class, 'configure'])->name('providers.configure');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
