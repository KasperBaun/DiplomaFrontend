interface IImageIconProps {
    width?: number;
    color?: string;
}

const ImageIcon: React.FC<IImageIconProps> = (props: IImageIconProps) => {

    const width = props.width ? props.width : 400;
    const height = props.width ? props.width : 400;
    const color = props.color ? props.color : 'black';
    return (
        <svg
            style={{ width: `${width}`, height: `${height}`, color: `${color}` }}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width={`400pt`}
            height={`400pt`}
            viewBox={`0 0 350 350`}
            preserveAspectRatio="xMidYMid meet"
            enable-background="new 0 0 350 350"
            fill="#000000"
        >
            <g
                transform={`translate(0.000000,231) scale(0.100000,-0.100000)`}
                fill={color}
                stroke="none">
                <path d="M5,350h340V0H5V350z M25,330v-62.212h300V330H25z M179.509,247.494H60.491L120,171.253L179.509,247.494z   M176.443,211.061l33.683-32.323l74.654,69.05h-79.67L176.443,211.061z M325,96.574c-6.384,2.269-13.085,3.426-20,3.426  c-33.084,0-60-26.916-60-60c0-6.911,1.156-13.612,3.422-20H325V96.574z M25,20h202.516C225.845,26.479,225,33.166,225,40  c0,44.112,35.888,80,80,80c6.837,0,13.523-0.846,20-2.518v130.306h-10.767l-104.359-96.526l-45.801,43.951L120,138.748  l-85.109,109.04H25V20z" />
            </g>
        </svg>

    )
}

export default ImageIcon;