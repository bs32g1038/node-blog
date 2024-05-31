import _Link from 'next/link';
/**
 * 默认不预加载 js code 文件
 * 重载 nextjs 的构造方法，使 auto-prefetches 为 false， 避免自动预加载 js code
 * 当需要预加载 js code 可以手动设置 prefetch=true。
 */
// export default class Link extends _Link {
//     constructor(props: LinkProps) {
//         super(props);
//         if (process.env.NODE_ENV !== 'production') {
//             if (props.prefetch) {
//                 console.warn(
//                     'Next.js auto-prefetches automatically based on viewport. The prefetch attribute is no longer needed. More: https://err.sh/zeit/next.js/prefetch-true-deprecated'
//                 );
//             }
//         }
//         this.p = props.prefetch === true;
//     }
// }
export default _Link;
