export default function Filter() {
  return (
    <>
      <div className='m-auto my-2 flex flex-row-reverse flex-wrap justify-center gap-1 px-2'>
        {<Link className='rounded-lg border-[1px] p-2 font-Lato'>الكل</Link>}
        <span className='rounded-lg border-[1px] p-2 font-Lato'>عملي</span>
        <span className='rounded-lg border-[1px] p-2 font-Lato'>رسمي</span>
        <span className='rounded-lg border-[1px] p-2 font-Lato'>
          بجامات نوم
        </span>
        <span className='rounded-lg border-[1px] p-2 font-Lato'>داخلي</span>
      </div>
    </>
  );
}
