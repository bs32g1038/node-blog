import styled from '@emotion/styled';
import React, { SFC } from 'react';

const FriendlyLinksItem = styled.li((_) => ({
    listStyle: 'none',
    margin: 0,
    padding: '10px',
    position: 'relative',
    width: '33.3%',
    label: 'link-item',
    boxSizing: 'border-box',
    a: {
        textDecoration: 'none'
    }
}));

const ItemContent = styled.div((_) => ({
    borderRadius: '5px',
    padding: '10px',
    position: 'relative',
    backgroundColor: '#f4f5f7'
}));

const Meta = styled.div((_) => ({
    alignItems: 'center',
    color: '#212121',
    display: 'flex'
}));

const Image = styled.img((_) => ({
    borderRadius: '50%',
    height: '20px',
    marginRight: '8px',
    width: '20px'
}));

const Description = styled.p((_) => ({
    color: '#6d757a',
    fontSize: '12px',
    height: '52px',
    marginBottom: '5px',
    marginTop: '5px',
    overflow: 'hidden'
}));

const Decoration = styled.i((_) => ({
    backgroundColor: '#cad0da',
    position: 'absolute',
    right: '-3px',
    bottom: '-3px',
    padding: '5px',
    borderRadius: '50%',
    color: '#fff',
    border: '4px solid #fff',
}));

const Item: SFC<{ item: any }> = (props: any) => {
    const item = props.item;
    return (
        <FriendlyLinksItem>
            <ItemContent>
                <a href={item.url} target="_blank" rel="noopener noreferrer" title={item.name}>
                    <Meta>
                        <Image src={item.logo} />{item.name}
                    </Meta>
                    <Description>{item.description}</Description>
                    <Decoration className="fa fa-link"></Decoration>
                </a>
            </ItemContent>
        </FriendlyLinksItem>
    );
};

export default Item;