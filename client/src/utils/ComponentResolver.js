import React from 'react';

export class ComponentResolver {
    components = {};

    register = (name, component) => {
        this.components[name] = component;
        return this;
    };

    resolve = (name, payload) => {
        const Component = this.components[name];
        if (!Component) return null;

        return <Component {...payload} />
    };
}
