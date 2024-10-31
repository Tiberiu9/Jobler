from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


# # this code also works
def custom_exception_response(exc, context):
    response = exception_handler(exc, context)
    exception_class = exc.__class__.__name__
    # print(exception_class)
    if exception_class == 'AuthenticationFailed':
        response = Response({'error': 'Invalid username or password. Try again'}, status=status.HTTP_401_UNAUTHORIZED)

    if exception_class == 'NotAuthenticated':
        response = Response({'error': 'Please login first'}, status=status.HTTP_401_UNAUTHORIZED)

    if exception_class == 'PermissionDenied':
        response = Response({'error': 'You do not have permission to perform this action'},
                            status=status.HTTP_403_FORBIDDEN)

    if exception_class == 'InvalidToken':
        response = Response({'error': 'Invalid or expired access token. Please login again'},
                            status=status.HTTP_401_UNAUTHORIZED)

    # etc

    return response

# # # following DRG official guide
# def custom_exception_response(exc, context):
#     # Call REST framework's default exception handler first,
#     # to get the standard error response.
#     response = exception_handler(exc, context)
#
#     # Now add the HTTP status code to the response.
#     if response is not None:
#         response.data['status_code'] = response.status_code
#
#     return response
