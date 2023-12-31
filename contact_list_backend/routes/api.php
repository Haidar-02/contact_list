<?php

use App\Http\Controllers\ContactController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/contacts', [ContactController::class, 'index']);
Route::post('/store', [ContactController::class, 'store']);
Route::post('/locations', [ContactController::class, 'getContactLocations']);
Route::put('/update/{id}', [ContactController::class, 'update']);
Route::get('/contact/{id}', [ContactController::class, 'getContact']);
Route::delete('/delete/{id}', [ContactController::class, 'destroy']);
