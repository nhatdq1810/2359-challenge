import React from 'react';
import { shallow } from 'enzyme';
import Navigation from './Navigation';

describe('Navigation', () => {
  const setPath = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render logo and 2 nav items', () => {
    const wrapper = shallow(<Navigation path="/" setPath={setPath} favouriteImagesSize={0} />);
    let logoComponent = wrapper.find('.logo');
    let navItems = wrapper.find('button');

    expect(logoComponent).toHaveLength(1);
    expect(navItems).toHaveLength(3);
    expect(navItems.at(1).prop('className')).toContain('active');
    expect(navItems.at(1).text()).toBe('Search');
    expect(navItems.at(2).prop('className')).not.toContain('active');
    expect(navItems.at(2).text()).toBe('Favourites');

    wrapper.setProps({ path: '/favourites', favouriteImagesSize: 1 });
    navItems = wrapper.find('button');

    expect(navItems.at(1).prop('className')).not.toContain('active');
    expect(navItems.at(2).prop('className')).toContain('active');
    expect(navItems.at(2).text()).toBe('Favourites (1)');
  });

  it('should call setPath when click on each nav items', () => {
    const wrapper = shallow(<Navigation path="/" setPath={setPath} favouriteImagesSize={0} />);
    const navItems = wrapper.find('button');
    const logo = navItems.at(0);
    const searchNavItem = navItems.at(1);
    const favouritesNavItem = navItems.at(2);

    logo.simulate('click');
    expect(setPath.mock.calls[0][0]).toBe('/');

    favouritesNavItem.simulate('click');
    expect(setPath.mock.calls[1][0]).toBe('/favourites');

    searchNavItem.simulate('click');
    expect(setPath.mock.calls[2][0]).toBe('/');
  });
});

