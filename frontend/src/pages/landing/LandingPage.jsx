import Button from '../../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {

  const navigate = useNavigate();

  const courses = [
    {
      title: 'Frontend Development',
      description: 'Master HTML, CSS, JavaScript and React.',
      image: '/course-1.jpg',
    },
    {
      title: 'Python Programming',
      description: 'Learn Python from beginner to advanced.',
      image: '/course-2.jpg',
    },
    {
      title: 'UI/UX Design',
      description: 'Build clean and modern user interfaces.',
      image: '/course-3.jpg',
    },
    {
      title: 'Backend Development',
      description: 'Learn Django, APIs and databases.',
      image: '/course-4.jpg',
    },
  ];

  return (

    <div className="bg-soft-lavender-100">

      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden">

        {/* Background Image */}
        <img
          src="/home_page.png"
          alt="Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-black/10" />
        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center px-6">

          <div className="max-w-3xl">

            <p className="mb-4 text-sm font-semibold uppercase tracking-[4px] text-butter-cream-200">
              MOOC Sphere
            </p>

            <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl">
              Learn Skills <br />
              Build Your Future
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90">
              Join thousands of learners mastering development,
              design and modern technology through practical courses.
            </p>

            <div className="mt-10 flex gap-4">

              <Button
                text="Explore Courses"
                type="primary"
                onClick={() => navigate('/courses')}
              />

              <Link
                to="/about"
                className="border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-black"
              >
                Sign Up
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* COURSES */}
      <section className="px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="flex items-center justify-between">

            <h2 className="text-4xl font-bold text-deep-lavender-500">
              Available Courses
            </h2>

            <Link
              to="/courses"
              className="border-2 border-deep-lavender-400 px-5 py-2 font-semibold text-deep-lavender-500 hover:bg-butter-cream-100"
            >
              All Courses
            </Link>

          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {courses.map((course, index) => (

              <div
                key={index}
                className="overflow-hidden border-2 border-deep-lavender-400 bg-butter-cream-100"
              >

                {/* Course Image */}
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-52 w-full object-cover"
                />

                {/* Content */}
                <div className="p-5">

                  <h3 className="text-xl font-bold text-deep-lavender-500">
                    {course.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-deep-lavender-400">
                    {course.description}
                  </p>

                  <div className="mt-6">

                    <Button
                      text="Enroll Course"
                      type="primary"
                    />

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

    </div>

  );
}