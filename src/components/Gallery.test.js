import React from 'react';
import { shallow } from 'enzyme';
import Gallery from './Gallery';

describe('Gallery', () => {
  const likeImage = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should not render when no gallery', () => {
    const wrapper = shallow(<Gallery />);
    expect(wrapper.type()).toBe(null);
  });

  it('should render empty state when gallery is empty', () => {
    const emptyMessage = 'empty';

    const wrapper = shallow(<Gallery gallery={[]} emptyMessage={emptyMessage} />);
    const emptyState = wrapper.find('.emptyState');
    const galleryComponent = wrapper.find('.gallery');

    expect(emptyState).toHaveLength(1);
    expect(emptyState.text()).toBe(emptyMessage);
    expect(galleryComponent).toHaveLength(0);
  });

  it('should render gallery', () => {
    const gallery = [
      { id: 1, title: 'title', images: { original_still: { url: 'image1-url' } } },
      { id: 2, title: 'title2', images: { original_still: { url: 'image2-url' } } },
    ];
    const favouriteImages = [gallery[0]];

    const wrapper = shallow(<Gallery gallery={gallery} favouriteImages={favouriteImages} likeImage={likeImage} />);
    const galleryComponent = wrapper.find('.gallery');
    const galleryItemComponent = wrapper.find('.galleryItem');
    const galleryImageComponent = wrapper.find('.galleryImage');
    const favouriteIconComponent = wrapper.find('.favouriteIcon');
    const fetchMoreButton = wrapper.find('.fetchMoreButton');

    expect(galleryComponent).toHaveLength(1);
    expect(galleryItemComponent).toHaveLength(2);
    expect(galleryImageComponent).toHaveLength(2);
    expect(galleryImageComponent.at(0).prop('src')).toBe(gallery[0].images.original_still.url);
    expect(galleryImageComponent.at(0).prop('alt')).toBe(gallery[0].title);
    expect(favouriteIconComponent).toHaveLength(2);
    expect(favouriteIconComponent.at(0).prop('className')).toContain('active');
    expect(favouriteIconComponent.at(1).prop('className')).not.toContain('active');
    expect(fetchMoreButton).toHaveLength(0);
  });

  it('should render fetch more button', () => {
    const gallery = [{ id: 1, title: 'title', images: { original_still: { url: 'image1-url' } } }];
    const favouriteImages = [];
    const showFetchMore = true;
    const isLoadingMore = true;
    const onFetchMoreProps = {};

    const wrapper = shallow(
      <Gallery
        gallery={gallery}
        favouriteImages={favouriteImages}
        showFetchMore={showFetchMore}
        isLoadingMore={isLoadingMore}
        likeImage={likeImage}
        onFetchMoreProps={onFetchMoreProps}
      />
    );
    let fetchMoreButton = wrapper.find('.fetchMoreButton');

    expect(fetchMoreButton).toHaveLength(1);
    expect(fetchMoreButton.prop('disabled')).toBe(true);
    expect(fetchMoreButton.text()).toBe('Loading...');

    wrapper.setProps({ showFetchMore:true, isLoadingMore: false });
    fetchMoreButton = wrapper.find('.fetchMoreButton');

    expect(fetchMoreButton.prop('disabled')).toBe(false);
    expect(fetchMoreButton.text()).toBe('Fetch more');

    wrapper.setProps({ showFetchMore: false, isLoadingMore: false });
    fetchMoreButton = wrapper.find('.fetchMoreButton');

    expect(fetchMoreButton.prop('disabled')).toBe(true);
    expect(fetchMoreButton.text()).toBe('No more');
  });
});
