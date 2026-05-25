from rest_framework import generics
from .models import Course
from .serializers import CourseSerializer, CourseDetailSerializer
from rest_framework.filters import SearchFilter
from rest_framework.permissions import AllowAny

class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]
    filter_backends = [SearchFilter]
    search_fields = ["title", "description"]


class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.prefetch_related("lessons")
    serializer_class = CourseDetailSerializer
    