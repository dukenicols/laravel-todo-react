<?php

namespace App\Services;

use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserService
{
    public function register($attributes)
    {
        $user = User::create($attributes);

        return $user;
    }

    public function login($attributes)
    {
        $token = JWTAuth::attempt([
            "email" => $attributes['email'],
            "password" => $attributes['password']
        ]);

        return $token;
    }
}
