"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const page = () => {
    const [images, setImages] = useState([
        '/images/image1.png',
        '/images/image2.png',
        '/images/image3.png',
        '/images/image4.png',
        // Add more image paths as needed
      ]);
      const onDragEnd = (result) => {
        if (!result.destination) {
          return;
        }
    
        const reorderedImages = Array.from(images);
        const [reorderedImage] = reorderedImages.splice(result.source.index, 1);
        reorderedImages.splice(result.destination.index, 0, reorderedImage);
    
        setImages(reorderedImages);
      };

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="image-gallery" direction="horizontal">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="image-gallery"
                        >
                            {images.map((image, index) => (
                                <Draggable
                                    key={index}
                                    draggableId={index.toString()}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            className="gallery-item"
                                        >
                                            <div {...provided.dragHandleProps}>
                                                {/* Add a drag handle (e.g., an icon or a specific div) here */}
                                                <span className="drag-handle-icon">☰</span>
                                            </div>
                                            <Image
                                                width={100}
                                                height={100}
                                                src={image}
                                                alt={`Image ${index}`}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default page