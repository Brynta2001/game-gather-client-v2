import Image from "next/image";

export default function Home() {
  return (
      <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        Discover & Review
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'> Game Gather</span>
      </h1>
      <p className='desc text-center'>
        Game Gather is a platform to discover and review video games.
      </p>    
    </section>
  );
}