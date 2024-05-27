<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post("/login", [UserController::class,"login"])->name('login');

Route::get("/logout", [UserController::class,"logout"])->name("logout");

Route::post("/register", [UserController::class,"register"])->name("register");

Route::post("/dashboard", [UserController::class,"dashboard"])->name("dashboard");