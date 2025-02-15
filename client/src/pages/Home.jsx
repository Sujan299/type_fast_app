import React, { useState } from 'react';
import Hero from '../components/Hero';
import PublicTyping from '../components/publicTyping';

const Home = () => {
    const [startTyping, setStartTyping] = useState(false);

    return (
        <div>
            {startTyping ? (
                <PublicTyping func={setStartTyping}/>
            ) : (
                <Hero func={setStartTyping} />
            )}
        </div>
    );
};

export default Home;
