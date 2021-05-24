import { Helmet } from 'react-helmet'

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content="Helmet application" />
        </Helmet>
    );
}

export default MetaData;
