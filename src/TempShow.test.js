/**
 * Тесты компонента TempShow.
 *
 * @author Denis Sikuler
 */

/* eslint-env mocha */
/* eslint-disable no-magic-numbers */

import { expect } from 'chai';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { checkWrapperAndUnmount, shallowSimulate } from 'react-test-util/enzyme';

import TempShow from './TempShow';

configure({ adapter: new Adapter() });

describe('TempShow', () => {

    // eslint-disable-next-line require-jsdoc
    function getSimulatedWrapper(props, eventData) {
        return shallowSimulate(<TempShow {...props} />, eventData || 'click');
    }

    // eslint-disable-next-line require-jsdoc
    function simulateAndCheck(props, eventData, checkSet) {
        checkWrapperAndUnmount( getSimulatedWrapper(props, eventData), checkSet );
    }

    // eslint-disable-next-line require-jsdoc
    function checkEventHandling(eventData, props, expectedVisible) {
        const wrapper = getSimulatedWrapper(props || {});
        expect( wrapper.state('visible') )
            .equal( true );

        shallowSimulate(
            wrapper,
            Object.assign(
                {
                    type: 'click'
                },
                typeof eventData === 'string'
                    ? {type: eventData}
                    : eventData
            )
        );
        expect( wrapper.state('visible') )
            .equal( expectedVisible || false );
        wrapper.unmount();
    }

    // eslint-disable-next-line require-jsdoc
    function checkParams(eventData, component) {
        expect( eventData )
            .a( 'object' );
        expect( component )
            .instanceOf( TempShow );
    }

    it('should render <div>', () => {
        const wrapper = shallow(<TempShow />);
        expect( wrapper.type() )
            .equal( 'div' );
    });

    it('should render specified children', () => {
        const contentClass = 'temp-show-content';
        const contentText = 'Header text';
        const content = (
            <h3 className={contentClass}>
                {contentText}
            </h3>
        );
        const wrapper = shallow(<TempShow>{content}</TempShow>)
            .children();
        expect( wrapper.type() )
            .equal( 'h3' );
        expect( wrapper.prop('className') )
            .equal( contentClass );
        expect( wrapper.text() )
            .equal( contentText );
    });

    it('should be invisible by default', () => {
        const wrapper = shallow(<TempShow />);
        expect( wrapper.state('visible') )
            .equal( false );
    });

    it('should be visible when "visible" property is set', () => {
        const wrapper = shallow(<TempShow visible={true} />);
        expect( wrapper.state('visible') )
            .equal( true );
    });

    it('"className" property of rendered component should contain specified value', () => {
        const testClass = 'an-important-class';
        const wrapper = shallow(<TempShow className={testClass} />);
        expect( wrapper.prop('className') )
            .equal( testClass );
    });

    it('"className" property of rendered component should contain value of "hideClassName" property', () => {
        const testClass = 'test-hide-class';
        const wrapper = shallow(<TempShow className="base-test-class" hideClassName={testClass} />);
        expect( wrapper.hasClass(testClass) )
            .equal( true );
    });

    it('"style" property of rendered component should contain value of "hideStyle" property', () => {
        const testStyle = {width: 0};
        const wrapper = shallow(<TempShow hideStyle={testStyle} />);
        expect( wrapper.prop('style') )
            .eql( testStyle );
    });

    it('should pass props specified in "componentProps" property to component', () => {
        const className = 'test-class';
        const componentClass = 'overwritten';
        const tabIndex = 2;
        const props = {
            className: componentClass,
            tabIndex
        };
        const wrapper = shallow(<TempShow className={className} componentProps={props} />);
        expect( wrapper.prop('tabIndex') )
            .equal( tabIndex );
        expect( wrapper.hasClass(className) )
            .equal( true );
        expect( wrapper.hasClass(componentClass) )
            .equal( false );
    });

    it('click should make component visible', () => {
        simulateAndCheck(null, null, {state: {visible: true}});
    });

    it('click should not make component visible', () => {
        simulateAndCheck({toggleVisibleOnClick: false}, null, {state: {visible: false}});
    });

    it('next click should make component invisible', () => {
        const target = {};

        checkEventHandling(
            {
                currentTarget: target,
                target
            }
        );
        checkEventHandling(
            {
                currentTarget: {},
                target
            },
            {
                hideOnAnyClick: true
            }
        );
        checkEventHandling(
            {
                currentTarget: {},
                target
            },
            {
                hideForClick: (eventData) => eventData.target === target
            }
        );
    });

    it('next click should not make component invisible', () => {
        // eslint-disable-next-line require-jsdoc
        function check(eventData, props) {
            checkEventHandling(eventData, props, true);
        }

        check(
            {
                currentTarget: {},
                target: {}
            }
        );
        check(
            {
                currentTarget: 1,
                target: 1
            },
            {
                hideForClick: (eventData) => eventData.currentTarget !== eventData.target
            }
        );
    });

    it('"className" property of rendered visible component should contain value of "showClassName" property', () => {
        const showClass = 'test-show-class';
        const hideClass = 'test-hide-class';
        simulateAndCheck(
            {
                showClassName: showClass,
                hideClassName: hideClass
            },
            null,
            {
                hasClass: {
                    [showClass]: true,
                    [hideClass]: false
                }
            }
        );
    });

    it('"style" property of rendered visible component should contain value of "showStyle" property', () => {
        const showStyle = {width: '100px'};
        simulateAndCheck(
            {
                showStyle
            },
            null,
            {
                prop: {
                    style: showStyle
                }
            }
        );
    });

    it('mouse move should make component visible', () => {
        simulateAndCheck(null, 'mousemove', {state: {visible: true}});
    });

    it('mouse move should not make component visible', () => {
        simulateAndCheck({showOnMouseOver: false}, 'mousemove', {state: {visible: false}});
    });

    it('should hide component after specified timeout', (done) => {
        const wrapper = getSimulatedWrapper({
            autoHide: 0.2
        });

        expect( wrapper.state('visible') )
            .equal( true );

        setTimeout(() => {
            expect( wrapper.state('visible') )
                .equal( false );
            wrapper.unmount();
            done();
        }, 300);
    });

    it('should change hide timeout when "autoHide" property is changed', (done) => {
        const wrapper = getSimulatedWrapper({
            autoHide: 0.1
        });

        wrapper.setProps({
            autoHide: 0.2,
            visible: true
        });

        setTimeout(() => {
            expect( wrapper.state('visible') )
                .equal( true );
        }, 150);

        setTimeout(() => {
            expect( wrapper.state('visible') )
                .equal( false );
            wrapper.unmount();
            done();
        }, 250);
    });

    it('should not hide component automatically', (done) => {
        const wrapper = getSimulatedWrapper({
            autoHide: 0
        });

        expect( wrapper.state('visible') )
            .equal( true );

        setTimeout(() => {
            expect( wrapper.state('visible') )
                .equal( true );
            wrapper.unmount();
            done();
        }, 300);
    });

    it('should postpone auto-hide when a property is changed', (done) => {
        const wrapper = getSimulatedWrapper({
            autoHide: 0.2
        });

        setTimeout(() => {
            wrapper.setProps({
                className: 'new-test-class',
                visible: true
            });
        }, 150);

        setTimeout(() => {
            expect( wrapper.state('visible') )
                .equal( true );
            wrapper.unmount();
            done();
        }, 250);
    });

    it('should not postpone auto-hide when non-autoHide property is changed', (done) => {
        const wrapper = getSimulatedWrapper({
            autoHide: 0.2,
            postponeAutoHide: false
        });

        setTimeout(() => {
            wrapper.setProps({
                className: 'new-test-class',
                visible: true
            });
        }, 150);

        setTimeout(() => {
            expect( wrapper.state('visible') )
                .equal( false );
            wrapper.unmount();
            done();
        }, 250);
    });

    it('should hide component on mouse leave when hideOnMouseLeave property is set', () => {
        const wrapper = getSimulatedWrapper({
            hideOnMouseLeave: true
        });

        expect( wrapper.state('visible') )
            .equal( true );

        shallowSimulate(wrapper, 'mouseLeave');

        expect( wrapper.state('visible') )
            .equal( false );

        wrapper.unmount();
    });

    it('focus event should make component visible', () => {
        simulateAndCheck(null, 'focus', {state: {visible: true}});
    });

    it('focus event should not make component visible', () => {
        simulateAndCheck({showOnFocus: false}, 'focus', {state: {visible: false}});
    });

    it('focus event should make component visible only when passed function return true value', () => {
        let result = 0;
        // eslint-disable-next-line require-jsdoc
        function check() {
            return result;
        }

        simulateAndCheck({showOnFocus: check}, 'focus', {state: {visible: false}});

        result = 1;

        simulateAndCheck({showOnFocus: check}, 'focus', {state: {visible: true}});
    });

    it('two parameters should be passed in "showOnFocus" function', () => {
        simulateAndCheck({showOnFocus: checkParams, visible: false}, 'focus', {state: {visible: false}});
    });

    it('blur event should make component hidden', () => {
        checkEventHandling('blur', {hideOnBlur: true});
    });

    it('blur event should not make component hidden', () => {
        checkEventHandling('blur', {hideOnBlur: false}, true);
    });

    it('blur event should make component hidden only when passed function return true value', () => {
        let result = 0;
        // eslint-disable-next-line require-jsdoc
        function check() {
            return result;
        }

        const wrapper = getSimulatedWrapper({
            hideOnBlur: check
        });

        expect( wrapper.state('visible') )
            .equal( true );

        shallowSimulate(wrapper, 'blur');

        expect( wrapper.state('visible') )
            .equal( true );

        result = 1;

        shallowSimulate(wrapper, 'blur');

        expect( wrapper.state('visible') )
            .equal( false );

        wrapper.unmount();
    });

    it('two parameters should be passed in "hideOnBlur" function', () => {
        simulateAndCheck({hideOnBlur: checkParams, visible: true}, 'blur', {state: {visible: true}});
    });

    it('should call "onShow" handler', () => {
        let control, value;
        const onShow = (visible, component) => {
            value = visible;
            control = component;
        };
        const wrapper = getSimulatedWrapper({onShow});

        expect( value )
            .equal( true );
        expect( control instanceof TempShow )
            .equal( true );
        
        wrapper.unmount();
    });

    it('should call "onHide" handler', () => {
        let control, value;
        const onHide = (visible, component) => {
            value = visible;
            control = component;
        };
        const wrapper = getSimulatedWrapper({onHide});

        shallowSimulate(wrapper, 'click');

        expect( value )
            .equal( false );
        expect( control instanceof TempShow )
            .equal( true );

        wrapper.unmount();
    });

    describe('.hideForClick(event)', () => {
        const { hideForClick } = TempShow;

        it('should return true', () => {
            const target = {};

            expect( hideForClick({
                currentTarget: target,
                target
            }) )
                .equal( true );
        });

        it('should return false', () => {
            expect( hideForClick({
                currentTarget: {},
                target: {}
            }) )
                .equal( false );
        });
    });
});
