import Link from 'next/link';

function SidebarLink({ text, Icon, active, linkTo = '/' }) {
  return (
    <Link href={linkTo}>
      <a
        className={`text-[#d9d9d9] flex items-center justify-center
           xl:justify-start text-xl space-x-3 hoverAnimation 
           ${active ? 'font-bold' : ''}`}
      >
        <Icon className='h-7' />
        <span className={`hidden xl:inline ${active ? 'text-bold' : ''}`}>
          {text}
        </span>
      </a>
    </Link>
  );
}

export default SidebarLink;
