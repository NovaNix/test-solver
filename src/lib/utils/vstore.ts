// Custom store-like object type
// This is used for storing data in a way that Svelte plays nicely with

export class VStore<T>
{
    #value: T;

    #listeners: ((value: any) => void)[] = [];

    constructor(v: T)
    {
        this.#value = v;
        this.#listeners = [];
    }

    get value(): T
    {
        return this.#value;
    }

    set value(v: T)
    {
        this.#value = v;

        this.notify(this);
    }

    // Svelte Store Stuff
    ///** @implements (subscription: (value: any) => void) => (() => void) */
    subscribe(listener: (value: any) => void): () => void
    {
        this.#listeners.push(listener);
        listener(this.value);

        return () =>
        {
            this.unsubscribe(listener);
        };
    }

    unsubscribe(listener: (value: any) => void)
    {
        const index = this.#listeners.indexOf(listener);

        if (index !== -1)
        {
            this.#listeners.splice(index, 1);
        }
    }

    notify(store: VStore<T>)
    {
        for (let listener of store.#listeners)
        {
            listener(store.value);
        }
    }

    set(v: T)
    {
        this.value = v;
    }

}

export class LockableVStore<T> extends VStore<T>
{
    #lockSource: VStore<boolean> | null;
    #lockUnsubscribe: any | null;
    #lockValue: T;

    constructor(v: T, source: VStore<boolean> | null, lockVal: T)
    {
        super(v);
        this.#lockValue = lockVal;
        this.#lockSource = null; // Set null temporarily so the setLockSource method can set it up
        this.setLockSource(source);
    }
    
    // onLockSourceUpdate()
    // {
    //     super.notify(this);
    // }

    setLockSource(source: VStore<boolean> | null)
    {
        if (this.#lockSource != null)
        {
            // Clean up the old lock source
            // this.#lockSource.unsubscribe(() => {
            //     super.notify(this);
            // });
            this.#lockUnsubscribe();
        }

        this.#lockSource = source;

        if (this.#lockSource != null)
        {
            this.#lockUnsubscribe = this.#lockSource.subscribe(() => {
                super.notify(this);
            });
        }
    }

    get value(): T
    {
        if (this.#lockSource == null)
            return super.value;

        if (this.#lockSource.value === true)
        {
            return this.#lockValue;
        }

        else
        {
            return super.value;
        }
    }

    set value(v: T)
    {
        super.value = v;
    }

    get locked()
    {
        if (this.#lockSource == null)
            return false;

        return this.#lockSource.value;
    }


}