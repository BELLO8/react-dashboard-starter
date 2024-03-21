import React, { useEffect, useState } from 'react';
import { getImg } from '../Utils/Utils';

export const Image = ({ ClientId }) => {
    const [imageUrl, setImageUrl] = useState('');
    console.log(imageUrl);
    useEffect(() => {
        const fetchClientImage = async () => {
            try {
                const response = await getImg(ClientId);
                const blob = new Blob([response], { type: 'image/*' });
                const reader = new FileReader();
                reader.onload = () => {
                    setImageUrl(reader.result);
                };
                reader.readAsDataURL(blob);
                // setImageUrl(URL.createObjectURL(blob));
            } catch (error) {
            }
        };

        fetchClientImage();
    }, [ClientId]);
    return (
        <>
            <img
                src={ClientId != null ? imageUrl : `https://randomuser.me/api/portraits/men/7${ClientId}.jpg`}
                alt=""
                className="rounded-full"
            />
        </>
    )
}
