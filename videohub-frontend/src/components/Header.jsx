import { Container, Menu, MenuItem, MenuMenu } from 'semantic-ui-react';
import { Icon, HeaderSubheader } from 'semantic-ui-react';
import React from 'react';

import "./Header.css"

export default function Header(props) {
    const isActive = (tab) => {
        return props.currentTab === tab
    }

    return (
        <React.Fragment>
            <Menu secondary inverted >
                <Menu.Item as={"a"} href="/" header>VideoHub🥶</Menu.Item>
                <MenuItem
                    as={"a"}
                    href="/"
                    name='Главная'
                    active={isActive('home')}
                >
                    <Icon name='home' />Главная
                </MenuItem>

                <MenuItem
                    as={"a"}
                    href="/videos"
                    name='Видео'
                    active={isActive('videos')}
                >
                    <Icon name='video play' />Видео
                </MenuItem>

                <MenuItem
                    as={"a"}
                    href="/search"
                    name='Поиск'
                    active={isActive('search')}
                >
                    <Icon name='search' />Поиск
                </MenuItem>

                <MenuMenu position='right'>
                    <MenuItem
                        as={"a"}
                        href="/login"
                        name='Войти'
                        active={isActive('login')}
                    >
                        <Icon name='sign in' />Войти
                    </MenuItem>
                    <MenuItem
                        as={"a"}
                        href="/register"
                        name='Регистрация'
                        active={isActive('register')}
                    >
                        <Icon name='user plus' />Регистрация
                    </MenuItem>
                </MenuMenu>
            </Menu>
        </React.Fragment>
    );
}


