<?php

use App\Http\Controllers\Api\V1\ApiKeyController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\PostController;
use App\Http\Controllers\Api\V1\WebhookController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('login', [AuthController::class, 'login']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
    });

    // Publicly accessible post routes
    Route::apiResource('posts', PostController::class)->only([
        'index', 'show'
    ])->parameters(['posts' => 'post_id']);

    Route::middleware('auth:jwt')->group(function () {
        // Human users can manage their keys
        Route::get('api-keys', [ApiKeyController::class, 'index']);
        Route::post('api-keys', [ApiKeyController::class, 'store']);
        Route::delete('api-keys/{tokenId}', [ApiKeyController::class, 'destroy']);

        // Human users can write/update/delete posts
        Route::apiResource('posts', PostController::class)->except([
            'index', 'show'
        ])->parameters(['posts' => 'post_id']);
    });

    Route::middleware('auth:sanctum')->group(function () {
        // Third-party apps can only create posts
        Route::post('webhook/posts', [WebhookController::class, 'store']);
    });
});
