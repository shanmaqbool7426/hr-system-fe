import Image from 'next/legacy/image';
export default function UserListView({ list, limit = 3, imgClass }) {
  return <ul className='flex pl-4'>
    {list?.slice(0, limit).map((item, index) => (
      <li key={index} className='cursor-pointer -ml-4 shrink-0' title={`${item?.firstName} ${item?.lastName}`}>
        {!item?.avatar == '' ?
          <figure className={`${imgClass ? `${imgClass}` : "w-12 h-12"} overflow-hidden rounded-full m-0`}>
            <Image src={item.avatar} width={48} height={48} alt={item.firstName} /></figure> :
          <span className={`uppercase relative overflow-hidden text-white font-semibold flex justify-center items-center rounded-full ${imgClass ? `${imgClass}` : "w-12 h-12"} m-0 z-${[index]} bg-themeBlue`}>
            {item?.firstName[0]}
          </span>
        }
      </li>
    ))}
    {list?.length > limit && <li className='-ml-4 shrink-0'>
      <span className={`overflow-hidden cursor-pointer relative z-10 text-white text-lg font-semibold flex justify-center items-center rounded-full ${imgClass ? `${imgClass}` : "w-12 h-12"} m-0 bg-themeBlue`}>
        +{list.length - limit}
      </span>
    </li>}
  </ul>
}