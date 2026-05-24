from django.conf import settings

def set_access_cookie(response, access_token):
    response.set_cookie(
        key="access_token",
        value=str(access_token),
        httponly=settings.JWT_COOKIE_HTTPONLY,
        secure=settings.JWT_COOKIE_SECURE,
        samesite=settings.JWT_COOKIE_SAMESITE,
    )
    return response


def set_refresh_cookie(response, refresh_token):
    response.set_cookie(
        key="refresh_token",
        value=str(refresh_token),
        httponly=settings.JWT_COOKIE_HTTPONLY,
        secure=settings.JWT_COOKIE_SECURE,
        samesite=settings.JWT_COOKIE_SAMESITE,
    )
    return response