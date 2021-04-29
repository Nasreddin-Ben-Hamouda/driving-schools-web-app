const SvgIcon = ({ src, width, height,style }) => (
        <img src={require(`../../../../assets/frontOffice/img/svg/${src}`).default} alt={src} width={width} height={height}
             style={style}/>
    );

export default SvgIcon;
