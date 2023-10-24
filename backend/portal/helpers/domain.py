import os


def get_domain(request):
    """
    Returns the domain of the request
    """
    return (
        "http://localhost:3000"
        if os.environ.get("DJANGO_DEBUG") == "True"
        else f"{request.scheme}://{request.get_host()}"
    )
