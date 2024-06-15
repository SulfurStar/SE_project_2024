export default defineNuxtRouteMiddleware(async ({ store, params, redirect }) => {
    const user = useState('user');
    
    console.log('user', user.value);
    if (!user.value) {
        return navigateTo('/posts');
    }
    if(!user.value.role ) {
        return navigateTo('/landlord_register');
    }

    const postId = params.id; // 获取路由参数中的帖子 ID
    const currentUser = user.value.id; // 获取当前登录用户信息
    const Pparams = {
        postId
    };
  
    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Pparams)
        });
        const data = await response.json();
        // console.log('data',data.authorId);
        // console.log('currentUser',currentUser);
        if (data.authorId !== currentUser) {
            return navigateTo('/posts');
        }

    } catch (error) {
        console.error('Error:', error);
    }
  });