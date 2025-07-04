<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiKeyController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        return $user->tokens;
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken($request->name);

        return ['token' => $token->plainTextToken];
    }

    public function destroy($tokenId)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->tokens()->where('id', $tokenId)->delete();

        return response()->json(null, 204);
    }
}
