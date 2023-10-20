import { useNavigate } from 'react-router-dom';
// import { useMemo } from 'react';

const injectHookies = WrappedComponent => props => {
    const navigate = useNavigate();
    // const memo = useMemo();

    return (
        <WrappedComponent
        {...props}
        {...{ navigate /*, memo*/ }}
        />
    );
};

export default injectHookies;