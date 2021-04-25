const SvgIcon = ({ src, width, height }) => (
        <img src={require(`../../../../assets/frontOffice/img/svg/${src}`).default} alt={src} width={width} height={height}/>
    );

export default SvgIcon;
