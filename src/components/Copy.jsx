import Image from "next/image";
import React from "react";
import copy from '../../assets/copy.svg'

function Copy() {

    return (
        <Image width={40} height={40} alt="copy" src={copy} className="copy"/>
    )
}

export default React.memo(Copy)