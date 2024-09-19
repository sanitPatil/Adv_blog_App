import React from 'react';

function Footer() {
  const Explore = ['Docs', 'Pricing', 'Blog', 'About'];
  const Features = ['User management', ' Workflow automation', 'API access'];

  const Product = ['Project Management', ' Multi-tenancy', ' Scalability'];
  return (
    <footer className="bg-gray-100 text-center pt-4 fixed bottom-0 w-full">
      <div className="grid grid-cols-4 text-slate-500 gap-4 italic font-semibold">
        <span className="text-xl">Creator @sanit patil</span>
        <span>
          <ul className="flex flex-col gap-2">
            {Product &&
              Product.map((product) => (
                <li className="gap-3" key={product}>
                  {product}
                </li>
              ))}
          </ul>
        </span>
        <span>
          <ul className="flex flex-col gap-2">
            {Features &&
              Features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
        </span>
        <span>
          <ul className="flex gap-4 underline">
            {Explore && Explore.map((exp) => <li key={exp}>{exp}</li>)}
          </ul>
        </span>
      </div>
      <p className="mt-4 bg-slate-200 p-2 bottom-0 text-sm">
        &copy; <span id="year"></span> Your Blog Name. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
