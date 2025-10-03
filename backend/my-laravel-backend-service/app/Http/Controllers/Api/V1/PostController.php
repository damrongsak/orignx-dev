<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Post::paginate();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Post::class);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'published_at' => 'nullable|date',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $post = $user->posts()->create($validated);

        return response()->json($post, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($post_id)
    {
        $post = Post::findOrFail($post_id);
        return response()->json($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $post_id)
    {
        $post = Post::findOrFail($post_id);
        $this->authorize('update', $post);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'published_at' => 'nullable|date',
        ]);

        $post->update($validated);

        return response()->json($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($post_id)
    {
        $post = Post::findOrFail($post_id);
        $this->authorize('delete', $post);

        $post->delete();

        return response()->json(null, 204);
    }
}
