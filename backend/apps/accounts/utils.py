from django.conf import settings

def set_access_cookie(response, access_token):
    response.set_cookie(
        key=settings.JWT_ACCESS_COOKIE_NAME,
        value=str(access_token),
        httponly=settings.JWT_COOKIE_HTTPONLY,
        secure=settings.JWT_COOKIE_SECURE,
        samesite=settings.JWT_COOKIE_SAMESITE,
    )
    return response


def set_refresh_cookie(response, refresh_token):
    response.set_cookie(
        key=settings.JWT_REFRESH_COOKIE_NAME,
        value=str(refresh_token),
        httponly=settings.JWT_COOKIE_HTTPONLY,
        secure=settings.JWT_COOKIE_SECURE,
        samesite=settings.JWT_COOKIE_SAMESITE,
    )
    return response

def delete_access_cookie(response):
    response.delete_cookie(
        settings.JWT_ACCESS_COOKIE_NAME,
        samesite=settings.JWT_COOKIE_SAMESITE,
    )
    return response


def delete_refresh_cookie(response):
    response.delete_cookie(
        settings.JWT_REFRESH_COOKIE_NAME,
        samesite=settings.JWT_COOKIE_SAMESITE,
    )
    return response