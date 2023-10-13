<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //create 3 functions to handle request for login, signup and logout
    //Request classes are to handle validation of the data before requesting
    public function signup(SignupRequest $request){
        $data = $request->validata();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

       $token = $user->createToken('main')->plainTextToken;

       return response(compact('user', 'token')); 
    }

    public function login(LoginRequest $request){
        $credentials = $request->validate();
        if(!Auth::attempt($credentials)){
            return response([
                'message' => 'Provided email or password is incorrect'
            ]);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token')); 
    }

    public function logout(Request $request){
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
