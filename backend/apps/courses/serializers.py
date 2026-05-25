from rest_framework import serializers
from .models import Course, Lesson,LessonProgress

class LessonSerializer(serializers.ModelSerializer):
    is_visited = serializers.SerializerMethodField()
    class Meta:
        model = Lesson
        fields = [
            "id",
            "title",
            "content",
            "video_url",
            "created_at",
            "is_visited",
        ]

    def get_is_visited(self, obj):
        request = self.context.get("request")

        if not request or not request.user.is_authenticated:
            return False

        return LessonProgress.objects.filter(
            user=request.user,
            lesson=obj
        ).exists()

class CourseSerializer(serializers.ModelSerializer):
    first_lesson_video = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "description",
            "created_at",
            "first_lesson_video",
        ]

    def get_first_lesson_video(self, obj):
        # Used reverse name lessons here
        first_lesson = obj.lessons.first()

        if first_lesson:
            return first_lesson.video_url

        return None


class CourseDetailSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True,read_only=True)

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "description",
            "created_at",
            "lessons",
        ]
