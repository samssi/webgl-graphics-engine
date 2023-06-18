# Overview of what's happening

## From code to GPU

### Application

Code here to make the graphics etc. happen. OpenGL, Direct3D. Resource creation, state setting and draw calls are
made through the API runtime.

### API runtime

API keeps track of the state that the implemented application has set, handles validation, data batching, error handling,
consistency checking, resource management and possibly shader code and shader linkage validation. It handles the
result to the graphics driver which is actually called user-mode driver.

### User-mode graphics driver (UMD)

The graphics driver resides on the CPU side and compiles shaders. These are sent to the GPU.

# OpenGL / WebGL

WebGL is a subset of OpenGL functions designed to be run in a browser by providing it a graphics API utilising
the GPU. OpenGL is the desktop equivalent version of WebGL for operating systems. These operating systems have
different implementations on how the communication happens to the GPU. OpenGL acts as an API for this interaction.

OpenGL / WebGL is a graphics pipeline and is interested from two things: clip space and color. This information
is provided with two shaders: A vertex shader and fragment shader

## Clip space

Clip space is a set of coordinates from -1 to 1 always

## Vertex shader & Fragment shader

Shaders are GPU components that can be programmed to perform graphical pipeline operations.

Vertex shader is called for each vertex in a primitive.

Vertex shaders typically perform transformations to post-projection space, for consumption by the Vertex Post-Processing
stage. They can also be used to do per-vertex lighting, or to perform setup work for later shader stages. Geometry
manipulation can be used to generate different set of effects eg. water.

One of the main difference is for vertex shader is that it can manipulate the attributes of vertices (corner points of
polygons).

Fragment shader (Pixel shader) is called for each fragment, usually this means a pixel. It takes care of how the pixels between the
vertices look. It is part of the rasterization step which is a fancy word for telling a pixel what color it should be.

It calculates the color based on the data that the Vertex shader passes in. Textures so on.

Fragment shader can be used to handle presentations like lightning and bump mapping.