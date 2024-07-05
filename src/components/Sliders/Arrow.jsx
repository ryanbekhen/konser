import { AngleLeft, AngleRight } from '../../utils/Icons';


export function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      className={`absolute -right-[10px] top-[35%] bg-white z-20 p-[8px] rounded-full`}
      style={{
        boxShadow: '0px 4px 4px 0px rgba(121, 136, 155, 0.24)'
      }}
      onClick={onClick}
    > <AngleRight size={24} color='black' /> </button>
  );
}

export function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      className={`absolute -left-[10px] top-[35%] bg-white z-20 p-[8px] rounded-full`}
      style={{
        boxShadow: '0px 4px 4px 0px rgba(121, 136, 155, 0.24)'
      }}
      onClick={onClick}
    > <AngleLeft size={24} color='black' /> </button>
  );
}
