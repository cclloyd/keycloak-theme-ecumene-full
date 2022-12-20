//import "./app.css";
import React, {lazy, Suspense, useCallback} from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

export default function BGParticles() {

    // @ts-ignore
    const reducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
    const isMobile = window.innerWidth < 1024;

    const particlesInit = useCallback(async (engine: any) => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);


    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: {},
                fpsLimit: 60,
                particles: {
                    collisions: {
                        enable: false,
                    },
                    move: {
                        enable: !reducedMotion,
                        outModes: {
                            default: "out",
                        },
                        speed: 0.2,
                        random: true,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 600,
                        },
                        value: isMobile ? 140 : 80,
                    },
                    opacity: {
                        value: 0.8,
                        random: true,
                        anim: {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    shape: {
                        type: 'image',
                        image: [
                            {
                                src: 'https://web.cclloyd.com/sites/sso/images/particle.webp',
                                width: 30,
                                height: 30,
                            },
                            {
                                src: 'https://web.cclloyd.com/sites/sso/images/particle-dark.webp',
                                width: 30,
                                height: 30,
                            },
                            {
                                src: 'https://web.cclloyd.com/sites/sso/images/particle-bright.webp',
                                width: 30,
                                height: 30,
                            },
                        ]
                    },
                    size: {
                        value: {min: 0.3, max: 10},
                    },
                },
                detectRetina: true,
            }}
        />
    );

}
