import React from 'react';
import './styles.scss';
import { MdAccountCircle } from 'react-icons/md';

type AvatarProps = {
  avatarUrl: string;
  iconClassName?: string;
  onClick?: () => void;
  large?: boolean;
};

const Avatar = ({ avatarUrl, iconClassName, onClick, large }: AvatarProps) => {
  return avatarUrl ? (
    <img
      src={avatarUrl}
      className={['avatar', large && 'avatar--large', iconClassName].join(' ')}
      onClick={onClick}
    ></img>
  ) : (
    <MdAccountCircle
      className={['avatar', large && 'avatar--large', iconClassName].join(' ')}
    />
  );
};

export default Avatar;
