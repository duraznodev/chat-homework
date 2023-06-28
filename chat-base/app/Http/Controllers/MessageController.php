<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Events\MessageCreated;
use App\Models\Message;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(Message::all());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->all("message","color","user_name");
        $message = Message::create($data);

        broadcast(new MessageCreated($message))->toOthers();

        return response()->json($message);
    }
}
