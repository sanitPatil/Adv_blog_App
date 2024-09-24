const BlogAppLogo = () => {
  return (
    <svg
      width="40"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Circle */}
      <circle
        cx="12"
        cy="12"
        r="15"
        fill="#F3F4F6"
        stroke="#D1D5DB"
        strokeWidth="2"
      />

      {/* Blog Icon */}
      <path
        d="M7 12h10M7 15h10M7 18h10"
        stroke="#1F2937"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Blog Title */}
      <text
        x="12"
        y="8"
        textAnchor="middle"
        fill="#1F2937"
        fontSize="5"
        fontWeight="bold"
      >
        Blog
      </text>
    </svg>
  );
};

export default BlogAppLogo;
