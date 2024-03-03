import { useRef } from "react";

class LRUCache{
    constructor(capacity){
        this.capacity =capacity;
        this.cache = {};
        this.head=null;
        this.tail=null;
    }

    get(key){
        if(this.cache[key]){
            this.moveToFront(key)
            return this.cache[key].value
        }
        
        return null;
    }

    put(key,val){

        if(this.cache[key]){
            this.cache[key].value = val;
            this.moveToFront(key)
        }
        else{
            
            if(Object.keys(this.cache).length === this.capacity){
                this.removeLast()
            }

            this.addToFront(key,val)
        }

    }

    addToFront(key,value){

        const newNode = {
            key,value,next:null
        }

        if(!this.head){
            this.head=newNode;
            this.tail=newNode;
        }
        else{
            newNode.next =  this.head;
            this.head = newNode;
        }

        this.cache[key]=newNode;
    }

    moveToFront(key){
        const current=this.cache[key];

        // if current is the only node
        if(current===this.head) return;
        
        let prevNode = null;
        let node = this.head;

        while(node && node.key!==key){
            prevNode=node;
            node=node.next
        }

        if(!node) return;

        // node is at last 
        if(node === this.tail){
            this.tail = prevNode;
        }

        // if node was somewhere in the middle 
        if(prevNode){
            prevNode.next = node.next;
        }

        node.next = this.head;
        this.head =node;
 
    }

    removeLast(){
        if(!this.head) return

        const lastKey = this.tail.key;
        delete this.cache[lastKey];

        if(this.head === this.tail){
            this.head = null;
            this.tail = null;
        }else{
            let current = this.head;
            while(current.next !== this.tail){
                current = current.next;
            }
            current.next = null;
            this.tail = current;
        }
    }

}


const useLRUCache = (capacity)=>{
    const cacheRef = useRef(new LRUCache(capacity))

    return {
        get:(key)=>cacheRef.current.get(key),
        put:(key,val)=>cacheRef.current.put(key,val)

    }
}

export default useLRUCache