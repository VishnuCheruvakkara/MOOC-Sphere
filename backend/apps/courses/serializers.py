from rest_framework import serializers
from .models import Course, Lesson,LessonProgress,Enrollment

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
    is_enrolled = serializers.SerializerMethodField() 
    is_completed = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "description",
            "created_at",
            "first_lesson_video",
            "is_enrolled",
            "is_completed"   
        ]

    def get_first_lesson_video(self, obj):
        # Used reverse name lessons here
        first_lesson = obj.lessons.first()

        if first_lesson:
            return first_lesson.video_url

        return None
    
    def get_is_enrolled(self, obj):
        request = self.context.get("request")

        if not request or not request.user.is_authenticated:
            return False

        return Enrollment.objects.filter(
            user=request.user,
            course=obj
        ).exists()
    
    def get_is_completed(self, obj):
        request = self.context.get("request")

        if not request or not request.user.is_authenticated:
            return False

        enrollment = Enrollment.objects.filter(
            user=request.user,
            course=obj
        ).first()

        if not enrollment:
            return False

        return enrollment.is_completed()

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
