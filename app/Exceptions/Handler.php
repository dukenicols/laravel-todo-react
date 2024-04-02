<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        if ($request->wantsJson() || $request->is('api/*')) {
            $status = method_exists($exception, 'getStatusCode')
                ? $exception->getStatusCode() : 500;

            $response = [
                'success' => false,
                'message' => $exception->getMessage(),
            ];

            if ($exception instanceof \Illuminate\Auth\AuthenticationException) {
                $response['message'] = 'Unauthenticated.';
            }

            if ($exception instanceof \Illuminate\Validation\ValidationException) {
                $status = 422;
                $response['errors'] = $exception->errors();
            }


            return response()->json($response, $status);
        }

        return parent::render($request, $exception);
    }
}
