import React from 'react';
import { useFetchConfigQuery, useFetchConfigSvgQuery } from '../../api';

export default function LogoSvg(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    const { data: config } = useFetchConfigQuery();
    const { data } = useFetchConfigSvgQuery({ url: config.siteLogo.replace('//' + config.siteDomain, '') });
    return <div dangerouslySetInnerHTML={{ __html: data }} {...props}></div>;
}
