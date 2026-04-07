<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_name' => 'required|string|max:50',
            'user_lastname' => 'required|string|max:50',
            'user_email' => 'required|string|email|max:100|unique:usuarios',
            'user_password' => 'required|string|min:8|confirmed',
            'user_coursenumber' => 'required|integer',
            'user_program' => 'required|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Get default role (Aprendiz)
        $role = Role::where('rol_name', 'Aprendiz')->first();

        $user = User::create([
            'user_name' => $request->user_name,
            'user_lastname' => $request->user_lastname,
            'user_email' => $request->user_email,
            'user_password' => Hash::make($request->user_password),
            'user_coursenumber' => $request->user_coursenumber,
            'user_program' => $request->user_program,
            'fk_id_rol' => $role->id_rol,
        ]);

        return response()->json(['message' => 'Usuario registrado exitosamente', 'user' => $user], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'user_email' => 'required|email',
            'user_password' => 'required',
        ]);

        $user = User::where('user_email', $credentials['user_email'])->first();

        if (!$user || !Hash::check($credentials['user_password'], $user->user_password)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login exitoso',
            'user' => $user,
            'role' => $user->role->rol_name,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Sesión cerrada']);
    }
}
