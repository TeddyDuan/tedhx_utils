const { hasOwnProperty } = Object.prototype;

class TreeUtil {
  /**
   *
   * @param list 原数组
   * @param key 主键，默认为'id'
   * @param parentKey 父键，默认为'parentId'
   * @returns {Array}
   */
  static list2Tree(
    list,
    key = 'id',
    parentKey = 'parentId',
    childrenKey = 'children',
  ) {
    if (Array.isArray(list) && list.length > 0 && key && parentKey) {
      // 遍历数组，根据parentKey建立父子元素之间的索引。
      const tree = ((raw) => {
        const result = {};
        for (let i = 0; i < raw.length; i += 1) {
          const parentValue = raw[i][parentKey];

          if (!hasOwnProperty.call(result, parentValue)) {
            result[parentValue] = [];
          }

          result[parentValue].push(raw[i]);
        }
        return result;
      })(list);

      const toTree = () => {
        for (let i = 0; i < list.length; i += 1) {
          const keyValue = list[i][key];
          if (hasOwnProperty.call(tree, keyValue)) {
            list[i][childrenKey] = tree[keyValue];
            delete tree[keyValue];
          }
        }

        return tree;
      };

      return toTree();
    }

    return [];
  }
}

export default TreeUtil;
