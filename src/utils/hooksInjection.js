import { useNavigate } from 'react-router-dom';

const injectHookies = WrappedComponent => props => {
    const navigate = useNavigate();

    return (
        <WrappedComponent
        {...props}
        {...{ navigate }}
        />
    );
};

export default injectHookies;